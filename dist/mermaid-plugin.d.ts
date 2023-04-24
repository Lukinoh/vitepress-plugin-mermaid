import { Plugin } from "vite";
export interface MermaidConfig {
    [x: string]: any;
}
export declare function MermaidPlugin(inlineOptions?: Partial<MermaidConfig>): Plugin;
