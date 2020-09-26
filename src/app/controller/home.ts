import { Context, inject, controller, get, provide } from 'midway';
import { ILabService } from '../../interface';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @inject('labService')
  service: ILabService;

  @get('/')
  async index() {
    const { service } = this;
    let data = await service.getIndexData();
    await service.renderTemplate('./home', data);
  }

  @get('/:name')
  async getFunc() {
    const { ctx, service } = this;
    let name = ctx.params.name;
    //let title = 'BZ302';
    switch (name) {
      case '/':
      case 'index':
        await this.index();
        break;
      case 'projects':
        let projectData = await service.projectsData();
        await service.renderTemplate('./aboutus', { projectData: projectData });
        break;
      case 'blog':
        let papers = [];
        let category = await service.categoryData();
        let queryParameter = ctx.request.query;
        if (Object.getOwnPropertyNames(queryParameter).length == 0) {
          papers = await service.paperData();
        } else {
          papers = await service.categoryPaperData(queryParameter.category);
        }
        await service.renderTemplate('./papers', { papers: papers, category: category });
        break;
      case 'contact':
        let recruit = await service.joinUsData();
        await service.renderTemplate('./contacted', { recruit: recruit });
        break;
      case 'team':
        let teamData = await service.members();
        let instructors = teamData.members.filter(item => { return item.type == "instructor"; });
        let doctors = teamData.members.filter(item => { return item.type == "doctor"; });
        let masters = teamData.members.filter(item => { return item.type == "master"; });
        let former = teamData.members.filter(item => { return item.type == "former"; });
        let visitors = teamData.members.filter(item => { return item.type == "visitor"; });
        let memData = instructors[0];
        let setMemdata = function (type, index) {
          console.log("Here");
          switch (type) {
            case 'instructor':
              memData = instructors[index].detail;
              break;
            case 'doctors':
              memData = doctors[index].detail;
              break;
            case 'masters':
              memData = masters[index].detail;
              break;
          }
        };
        await service.renderTemplate('./member', { memData: memData, setMemdata: setMemdata, instructors: instructors, masters: masters, doctors: doctors, formers: former, visitors: visitors });
        break;
      case 'activity':
        let activities = await service.activityData();
        await service.renderTemplate('./activity', { activities: activities });
        break;
      default:
        await this.index();
        break;
    }
  }

}




