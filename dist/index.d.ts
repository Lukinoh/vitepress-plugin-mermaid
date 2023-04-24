import { type UserConfig } from "vitepress";
import { type MermaidConfig } from "./mermaid-plugin";
export { MermaidMarkdown } from "./mermaid-markdown";
export { MermaidPlugin } from "./mermaid-plugin";
declare module "vitepress" {
    interface UserConfig {
        mermaid?: MermaidConfig;
    }
}
export declare const withMermaid: (config: UserConfig) => UserConfig<any>;
