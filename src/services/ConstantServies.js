const localhost = "https://temple.atomwalk.com";

export const endpoint = `${localhost}/temple/api`;
export const authEndpoint = `${localhost}/auth`;

// Auth endpoints
export const loginEndpoint = `${authEndpoint}/login/`;

// Temple endpoints
export const AddupdateTemple = `${endpoint}/process_temple_data/`;
export const getTempleList = `${endpoint}/get_temple_list/`;
export const AddTempleImages = `${endpoint}/process_temple_images/`;

