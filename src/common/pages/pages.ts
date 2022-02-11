export interface PageProps<T> {
  data: T;
}

export type Page<T = any> = (props: PageProps<T>) => JSX.Element;
