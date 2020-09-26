import { provide, inject, Context, plugin } from 'midway';
import { ILabService } from '../interface';
// const path = require('path')

@provide('labService')
export class LabService implements ILabService {

  @inject()
  ctx: Context;

  @plugin()
  model;


  async renderTemplate(path, data) {
    await this.ctx.render('index', {
      template: path,
      templateData: data
    });
  }

  async homeData() {
    return this.ctx.model.HomeModel.findAll({
      where: {
        id: 0,
      }
    });
  }

  async newsData() {
    return this.ctx.model.NewsModel.findAll({
      attributes: ['id', 'year', 'month', 'detail']
    });
  }
  async cooperatorsData() {
    return this.ctx.model.CooperatorsModel.findAll({
      attributes: ['id', 'name', 'type', 'image']
    });
  }
  async projectsData() {
    return this.ctx.model.ProjectsModel.findAll({ attributes: ['id', 'title', 'detail', 'image'] });
  }
  async joinUsData() {
    return this.ctx.model.JoinUsModel.findAll({ attributes: ['id', 'title', 'contents'] });
  }

  async categoryData() {
    return this.ctx.model.CategoryModel.findAll({ attributes: ['category', 'number'] });
  }
  async getCategoryNumber(category: string) {
    return this.ctx.model.CategoryModel.findAll({
      where: {
        category: category
      },
      attributes: ['category', 'number']
    });
  }

  async getCategoryModel(category:string) {
    return await this.ctx.model.CategoryModel.findAll({
      where: {
        category: category
      },
      attributes: ['category', 'number']
    });
  }
  async getCategoryData(category:string) {
    return await this.ctx.model.CategoryModel.findAll({attributes:['category','number']});
  }


  async paperData() {
    return this.ctx.model.PaperModel.findAll({ attributes: ['id', 'title', 'author', 'conference', 'time', 'category'] });
  }
  async categoryPaperData(category: string) {
    return this.ctx.model.PaperModel.findAll({
      where: {
        category: category
      },
      attributes: ['id', 'title', 'author', 'conference', 'time', 'category']
    });
  }

  async activityData() {
    return this.ctx.model.ActivitiesModel.findAll({ attributes: ['id', 'title', 'detail', 'image'] });
  }

  async members() {
    let teamData = await this.ctx.model.MembersModel.findAll({ attributes: ['id', 'name_en', 'name_cn', 'job_title', 'degree', 'institude', 'photo', 'type', 'detail', 'url'] });
    teamData = Array.from(teamData);
    let members = teamData;
    members.forEach(item => {
      let detail = item.detail;
      detail = detail.split("&&");
      item.detail = detail;

      let degree = item.degree;
      degree = degree.split("&&");
      item.degree = degree;

      // let photo_path = item.photo;
      // if (photo_path) {
      //   photo_path = path.join('public', photo_path)publ;
      //   item.photo = photo_path;
      // }
    });
    return {
      members
    }
  }

  async getIndexData(): Promise<any> {
    let introData = await this.homeData();
    introData = introData[0];
    let cooperationsDataTemp = await this.cooperatorsData();
    let company = cooperationsDataTemp.filter(item => { return item.type == "company"; });
    let university = cooperationsDataTemp.filter(item => { return item.type == "university"; });
    let cooperationsData = {
      company,
      university
    }
    let newsDatas = await this.newsData();
    let data = {
      lab_photo: introData.lab_photo,
      lab_name: introData.lab_name,
      lab_intro: introData.lab_intro,
      lab_intro_en: introData.lab_intro_en,
      team_intro: introData.team_intro,
      cooperationsData: cooperationsData,
      newsDatas: newsDatas
    };
    return data;
  }



  // post code!!!!!!!!!!!!!!!!!!!!!!!

  async account(name: any, pwd: any): Promise<any> {

    console.log(this)
    return this.ctx.model.AccountModel.findAll({
      where: {
        name: name,
        passwd: pwd,
      }
    });
  }


}
