import {
  getRouteApi,
  RegisteredRouter,
  RouteIds,
  SearchParamOptions,
} from '@tanstack/react-router';

export function useFilters<
  TId extends RouteIds<RegisteredRouter['routeTree']>,
  TSearchParams extends SearchParamOptions<RegisteredRouter, TId, TId>['search']
>(routeId: TId) {
  const routeApi = getRouteApi<TId>(routeId);
  const navigate = routeApi.useNavigate();
  const filters = routeApi.useSearch();

  type SParms = typeof filters;

  const setFilters = (partialFilters: Partial<SParms>) =>
    navigate({
      search: cleanEmptyParams({
        ...filters,
        ...partialFilters,
      }) as TSearchParams,
    });

  const resetFilters = () => navigate({ search: {} as TSearchParams });

  return { filters, setFilters, resetFilters };
}

function cleanEmptyParams<T extends Record<string, unknown>>(search: T) {
  const newSearch = { ...search };
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key];
    if (
      value === undefined ||
      value === '' ||
      (typeof value === 'number' && isNaN(value))
    )
      delete newSearch[key];
  });

  return newSearch;
}
