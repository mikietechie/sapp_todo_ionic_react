import { isPlatform } from "@ionic/react";

export const serverUrl = window.location.hostname === "localhost" ? `http://localhost:8000` : `http://34.175.44.81:8001` // `http://${isPlatform("android") ? '10.0.2.2':  'localhost'}:8000`
export const apiUrl = `${serverUrl}/space/api`

export const TINYMCE_KEY = "gkqyr0tntarqnsof0851gfteokgn9z24hlkm1ybwskrc8w1i"
