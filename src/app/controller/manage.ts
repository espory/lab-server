import { Context, inject, controller, get, post, provide } from 'midway';
import { ILabService } from '../../interface';

@provide()
@controller('/')
export class ManageController {

  @inject()
  ctx: Context;

  @inject('labService')
  service: ILabService;

  @get('/manage/:name')
  async getManageFunc() {
    const { ctx, service } = this;
    let name = ctx.params.name;

    switch (name) {
      case 'manage':
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
          ctx.response.body = "inline";
        } else {
          ctx.response.body = "error";
        }
        break;
      case "intro":
        let intro = await service.homeData();
        intro = intro[0].dataValues;
        let ans = {
          lab_name: intro.lab_name,
          lab_name_en: intro.lab_name_en,
          lab_intro: intro.lab_intro,
          lab_intro_en: intro.lab_intro_en,
          lab_photo: intro.lab_photo,
          team_intro: intro.team_intro,
          strength: intro.strength
        };
        ctx.response.body = {
          status: '1',
          data: ans
        };
        break;
      case "member":
        let teamData = await service.members();
        ctx.response.body = {
          status: '1',
          data: teamData
        };
        break;
      case "category":
        let category = await service.categoryData();
        ctx.response.body = {
          status: '1',
          data: category
        };
        break;
      case "paper":
        let papers = await service.paperData();
        ctx.response.body = {
          status: '1',
          data: papers
        };
        break;
      case "activities":
        let activities = await service.activityData();
        ctx.response.body = {
          status: '1',
          data: activities
        };
        break;
      case "cooperators":
        let cooperators = await service.cooperatorsData();
        ctx.response.body = {
          status: '1',
          data: cooperators
        };
        break;
      case "news":
        let news = await service.newsData();
        ctx.response.body = {
          status: '1',
          data: news
        };
        break;
      case "joinus":
        let joinus = await service.joinUsData();
        ctx.response.body = {
          status: '1',
          data: joinus
        };
        break;
      case "projects":
        let projects = await service.projectsData();
        ctx.response.body = {
          status: '1',
          data: projects
        };
        break;
      default:
        break;
    }
  }

  @post('/:path')
  async postManageFunc() {
    const { ctx, service } = this;
    let path = ctx.params.path;
    switch (path) {
      case 'login':
        var name = ctx.request.body.name || '';
        var password = ctx.request.body.password || '';
        let ans = await service.account(name, password);

        if (ans.length < 1) {
          ctx.response.body = "error";
        } else {
          let session = ctx.session;
          session.isLogin = true;
          session.userName = name;
          ctx.response.body = "success";
        }
        break;
      case 'introduction':
        let data = ctx.request.body;
        let intro = await service.homeData();
        intro[0].lab_name = data.lab_name;
        intro[0].lab_name_en = data.lab_name_en;
        intro[0].lab_intro = data.lab_intro;
        intro[0].lab_intro_en = data.lab_intro_en;
        intro[0].team_intro = data.team_intro;
        intro[0].strength = data.strength;
        await intro[0].save();
        ctx.response.body = "success";
        break;
      case 'labimg':
        const fs = require('fs')
        const path = require('path')
        let filePath = ctx.request.files[0].filepath;
        console.log(filePath)
        let file = fs.readFileSync(filePath);
        let basePath = path.join('upload', path.basename(filePath));
        fs.writeFileSync(path.join(ctx.app.baseDir, `app/public`, basePath), file)
        let img_model = await service.homeData();
        img_model[0].lab_photo = basePath;
        await img_model[0].save();
        ctx.response.body = JSON.stringify({ url: basePath });
        break;

      // case 'image':
      //   let file_path = ctx.request.files.picture.path;
      //   file_path = file_path.replace(/\\/g, "/");
      //   file_path = file_path.replace(/.*static\//, "");
      //   ctx.response.body = JSON.stringify({ url: file_path });
      //   break;
      case "paper":
        let onePaper = ctx.request.body.data;
        let oldCategory = ctx.request.body.oldCategory;
        let model = await ctx.PaperModel;
        let getNumber = 0;
        let modifyType = {};
        let CategoryMod = await ctx.model.CategoryModel;
        if (ctx.request.body.type == 'modify' && oldCategory != '' && oldCategory != onePaper['category']) { // 修改category
          getNumber = await service.getCategoryNumber(oldCategory);
          modifyType = {};
          modifyType['category'] = oldCategory;
          modifyType['number'] = getNumber[0].number - 1;
          await CategoryMod.upsert(modifyType); // 减少旧category的数量

          getNumber = await service.getCategoryNumber(onePaper['category']);
          modifyType['category'] = onePaper['category'];
          modifyType['number'] = getNumber[0].number + 1;
          await CategoryMod.upsert(modifyType); // 增加category的数量
        } else if (ctx.request.body.type == 'add' || oldCategory == '') { // 添加paper
          getNumber = await service.getCategoryNumber(onePaper['category']);
          modifyType['category'] = onePaper['category'];
          modifyType['number'] = getNumber[0].number + 1;
          await CategoryMod.upsert(modifyType);
        }
        await model.upsert(onePaper);
        //await model.upsert(onePaper);
        ctx.response.body = "success";
        break;
      case "category":
        let oneType = ctx.request.body.newCategory;
        let category = await service.categoryData();
        category = Array.from(category);
        category = category.map(item => item.category);
        if (category.indexOf(oneType) > -1) {
          ctx.response.body = "fail";
        } else {
          let CategoryModel = await ctx.model.CategoryModel;
          let insertType = {};
          insertType['category'] = oneType;
          insertType['number'] = 0;
          await CategoryModel.upsert(insertType);
          ctx.response.body = "success";
        }
        break;

      case "delpaper":
        let id = ctx.request.body.id;
        let model_paper = await ctx.model.PaperModel;
        await model_paper.destroy({ where: { id: id } });
        ctx.response.body = "success";
        break;

      case "member":
        let oneMember = ctx.request.body;
        let model_member = await ctx.model.MembersModel;
        let msg = {
          id: oneMember.id,
          type: oneMember.type,
          name_cn: oneMember.name_cn,
          name_en: oneMember.name_en,
          institude: oneMember.institude,
          job_title: oneMember.job_title,
          degree: oneMember.degree,
          detail: oneMember.detail,
          photo: oneMember.photo,
          url: oneMember.url
        };
        await model_member.upsert(msg);
        ctx.response.body = "success";
        break;

      case "delmember":
        let member_id = ctx.request.body.id;
        let model_mem = await ctx.model.MembersModel;
        await model_mem.destroy({ where: { id: member_id } });
        ctx.response.body = "success";
        break;

      case "delactivities":
        let activities_id = ctx.request.body.id;
        let model_act = await ctx.model.ActivitiesModel;
        await model_act.destroy({ where: { id: activities_id } });
        ctx.response.body = "success";
        break;
      case "activities":
        let oneActive = ctx.request.body;
        let model_Active = await ctx.model.ActivitiesModel;
        let active = {
          id: oneActive.id,
          title: oneActive.title,
          detail: oneActive.detail,
          image: oneActive.image
        };
        await model_Active.upsert(active);
        ctx.response.body = "success";
        break;
      case 'cooperators':
        let oneCooprator = ctx.request.body;
        let model_Cooperator = await ctx.model.CooperatorsModel;
        let cooperator = {
          id: oneCooprator.id,
          name: oneCooprator.name,
          type: oneCooprator.type,
          image: oneCooprator.image
        };
        await model_Cooperator.upsert(cooperator);
        ctx.response.body = "success";
        break;
      case "delacooperator":
        let cooperator_id = ctx.request.body.id;
        let model_cooperator = await ctx.model.CooperatorsModel;
        await model_cooperator.destroy({ where: { id: cooperator_id } });
        ctx.response.body = "success";
        break;

      case "delnews":
        let news_id = ctx.request.body.id;
        let model_news = await ctx.model.NewsModel;
        await model_news.destroy({ where: { id: news_id } });
        ctx.response.body = "success";
        break;
      case 'news':
        let oneNews = ctx.request.body;
        let model_News = await ctx.model.NewsModel;
        let news = {
          id: oneNews.id,
          year: oneNews.year,
          month: oneNews.month,
          detail: oneNews.detail
        };
        await model_News.upsert(news);
        ctx.response.body = "success";
        break;

      case "delprojects":
        let projects_id = ctx.request.body.id;
        let model_projects = await ctx.model.ProjectsModel;
        await model_projects.destroy({ where: { id: projects_id } });
        ctx.response.body = "success";
        break;
      case 'projects':
        let oneProjects = ctx.request.body;
        let model_Projects = await ctx.model.ProjectsModel;
        let projects = {
          id: oneProjects.id,
          title: oneProjects.title,
          detail: oneProjects.detail,
          image: oneProjects.image
        };
        await model_Projects.upsert(projects);
        ctx.response.body = "success";
        break;


      case "deljoinus":
        let joinus_id = ctx.request.body.id;
        let model_joinus = await ctx.model.JoinUsModel;
        await model_joinus.destroy({ where: { id: joinus_id } });
        ctx.response.body = "success";
        break;
      case 'joinus':
        let oneJoinus = ctx.request.body;
        let model_Joinus = await ctx.model.JoinUsModel;
        let joinus_record = {
          id: oneJoinus.id,
          title: oneJoinus.title,
          contents: oneJoinus.contents
        };
        await model_Joinus.upsert(joinus_record);
        ctx.response.body = "success";
        break;

      default:
        ctx.response.body = "error";
        break;
    }
  }

}




