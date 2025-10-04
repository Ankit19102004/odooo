declare module 'react' {
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  export interface ReactNodeArray extends Array<ReactNode> {}
  export type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;

  export interface ReactFragment {
    children?: ReactNode;
  }

  export interface ReactPortal extends ReactElement {
    children: ReactNode;
    containerInfo: any;
    implementation?: any;
  }

  export type Key = string | number;
  export type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<any, any>);

  export interface Component<P = {}, S = {}> {
    props: P;
    state: S;
    context: any;
    refs: any;
    render(): ReactElement<any, any> | null;
  }

  export interface ComponentClass<P = {}, S = ComponentState> {
    new (props: P, context?: any): Component<P, S>;
    displayName?: string;
    defaultProps?: Partial<P>;
    propTypes?: any;
  }

  export type ComponentState = any;

  export interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }, context?: any): ReactElement<any, any> | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  export type FC<P = {}> = FunctionComponent<P>;

  export interface HTMLAttributes<T> {
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<T>) => void;
    onChange?: (event: React.ChangeEvent<T>) => void;
    onKeyDown?: (event: React.KeyboardEvent<T>) => void;
    children?: ReactNode;
  }

  export interface CSSProperties {
    [key: string]: any;
  }

  export interface MouseEvent<T = Element> {
    target: T;
    currentTarget: T;
    preventDefault(): void;
    stopPropagation(): void;
  }

  export interface ChangeEvent<T = Element> {
    target: T & { value: string };
    currentTarget: T;
    preventDefault(): void;
    stopPropagation(): void;
  }

  export interface KeyboardEvent<T = Element> {
    target: T;
    currentTarget: T;
    key: string;
    preventDefault(): void;
    stopPropagation(): void;
  }

  export interface Element {
    tagName: string;
    attributes: NamedNodeMap;
  }

  export interface NamedNodeMap {
    length: number;
    getNamedItem(name: string): Attr | null;
  }

  export interface Attr {
    name: string;
    value: string;
  }

  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prevState: S) => S)) => void];
  export function useState<S = undefined>(): [S | undefined, (value: S | ((prevState: S | undefined) => S | undefined)) => void];
  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
  export function createElement<P extends {}>(
    type: string | ComponentClass<P> | FunctionComponent<P>,
    props?: P & { children?: ReactNode },
    ...children: ReactNode[]
  ): ReactElement<P>;
}

declare module 'react-dom' {
  export function createRoot(container: Element | DocumentFragment): {
    render(element: React.ReactElement): void;
  };
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {}
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}
