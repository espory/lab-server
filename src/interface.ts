/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  id: number;
}

/**
 * @description User-Service response
 */
export interface IUserResult {
  id: number;
  username: string;
  phone: string;
  email?: string;
}

/**
 * @description User-Service abstractions
 */
export interface IUserService {
  getUser(id: string | number): Promise<any>;
  login(options): Promise<any>;
  register(options): Promise<any>;
}

export interface ILabService {
  renderTemplate(path:string, data:any): Promise<any>;
  getIndexData(): Promise<any>;
  homeData(): Promise<any>;
  newsData(): Promise<any>;
  cooperatorsData(): Promise<any>;
  members(): Promise<any>;
  projectsData(): Promise<any>;
  joinUsData(): Promise<any>;
  categoryData(): Promise<any>;
  getCategoryNumber(category:string): Promise<any>;
  paperData(): Promise<any>;
  categoryPaperData(category:string): Promise<any>;
  activityData(): Promise<any>;

//post!!!!!!!!!
  account(name:any, pwd:any): Promise<any>;
  getCategoryModel(category:string): Promise<any>;
  getCategoryData(category:string): Promise<any>;
}