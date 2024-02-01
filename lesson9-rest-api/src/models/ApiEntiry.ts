export default class ApiEntiry{
    Api!:string
    Description!:string
    Link!:string
    Category!:number|null

    constructor(Api:string,Description:string,Link:string,Category:number|null){

        this.Api=Api;
        this.Description=Description;
        this.Link=Link;
        this.Category=Category;

    }
}