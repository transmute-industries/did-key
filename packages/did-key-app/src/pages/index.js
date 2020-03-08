import HomePage from "./HomePage";
import KeystorePage from "./KeystorePage";
import OfflinePDF from './OfflinePDF';

export const PAGES = [
  { path: "/", exact: true, component: HomePage },
  { path: "/keystore", exact: true, component: KeystorePage },
  { path: "/offline", exact: true, component: OfflinePDF }
];
