using Microsoft.Practices.Unity;
using System.Web.Http;
using Arabia.Core.Caching;
using Arabia.Core.Data;
using Arabia.Data;
using Arabia.Service.Backend.Files;
using Arabia.Service.Backend.General;
using Arabia.Service.Backend.Interviews;
using Arabia.Service.Backend.News;
using Arabia.Service.Backend.Articles;
using Arabia.Service.Backend.Questions;
using Arabia.Service.Backend.Albums;
using Arabia.Service.Backend.Categories;
using Arabia.Service.Backend.Competitions;
using Arabia.Service.Backend.Videos;
using Arabia.Service.Backend.Matches;
using Arabia.Service.Backend.Teams;
using Arabia.Service.Backend.Peoples;
using Arabia.Service.Backend.Seasons;
using Unity.WebApi;

namespace Arabia.Web.API
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            container.RegisterType(typeof(IMongoRepository<>), typeof(MongoDbRepository<>), new InjectionConstructor("MongoDB"));
            container.RegisterType<ICacheManager, MemoryCacheManager>();
            container.RegisterType<IInterviewService, InterviewService>();
            container.RegisterType<IQuestionService, QuestionService>();
            container.RegisterType<IQuizService, QuizService>();
            container.RegisterType<IFileService, FileService>();
            container.RegisterType<IEditorService, EditorService>();
            //container.RegisterType<ILocationService, LocationService>();
            container.RegisterType<INewsItemService, NewsItemService>();
            container.RegisterType<IArticleService, ArticleService>();
            container.RegisterType<IAlbumService, AlbumService>();
            container.RegisterType<IIntervieweeService, IntervieweeService>();
            container.RegisterType<IImageService, ImageService>();
            container.RegisterType<IUploadImageService, UploadImageService>();
            container.RegisterType<IFixedMediaService, FixedMediaService>();
            container.RegisterType<ICategoryService, CategoryService>();
            container.RegisterType<IGalleryService, GalleryService>();
            container.RegisterType<IVideoService, VideoService>();
            container.RegisterType<IMatchService, MatchService>();
            container.RegisterType<IPeopleService, PeopleService>();
            container.RegisterType<ICompetitionService, CompetitionService>();
            container.RegisterType<ITeamService, TeamService>();
            container.RegisterType<ISeasonService, SeasonService>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}