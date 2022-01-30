/* SystemJS module definition */
declare var module: NodeModule;
declare var cv: any;
interface NodeModule {
  id: string;
}
declare module 'quill';
declare module 'leaflet';
declare module 'screenfull';
declare module 'd3-shape';
/* "engines": {
  "node": "14.14.0",
  "npm": "6.14.8"
}
*/