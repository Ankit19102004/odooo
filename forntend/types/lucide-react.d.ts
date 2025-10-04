declare module 'lucide-react' {
  export interface LucideProps {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
    style?: React.CSSProperties;
  }

  export const Users: React.FC<LucideProps>;
  export const Edit: React.FC<LucideProps>;
  export const Trash2: React.FC<LucideProps>;
  export const Shield: React.FC<LucideProps>;
  export const UserPlus: React.FC<LucideProps>;
  export const Settings: React.FC<LucideProps>;
  export const Plus: React.FC<LucideProps>;
  export const Save: React.FC<LucideProps>;
}
