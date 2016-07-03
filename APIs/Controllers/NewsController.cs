using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using Arabia.Core.Domain.General;
using Arabia.Core.Domain.News;
using Arabia.Service.Backend.News;
using MongoDB.Bson;

namespace Arabia.Web.API.Controllers
{
    [RoutePrefix("NewsItem")]
    public class NewsItemController : ApiController
    {
        #region Fields

        private readonly INewsItemService _newsItemService;

        #endregion

        #region Ctor

        public NewsItemController(INewsItemService newsItemService)
        {
            _newsItemService = newsItemService;
        }

        #endregion

        #region Methods

        public IList<NewsItem> Get()
        {
            return _newsItemService.GetNewsItems();
        }

        public NewsItem Get(string id)
        {
            return _newsItemService.GetNewsItemById(new ObjectId(id));
        }
        [Route("GetBySpec")]
        public ResultWithCount<RelatedNewsItem> GetBySpec(string title = "", string newsItemId = "", DateTime? publishedOn = null, bool? isPublished = null, int pageIndex = 1, int pageSize = 20)
        {
            ObjectId id ;
            ObjectId.TryParse(newsItemId,out id);
            return _newsItemService.GetNewsBySpec(title,id, publishedOn, isPublished, pageIndex, pageSize);
        }



        [Route("GetInfographBySpec")]
        public ResultWithCount<RelatedNewsItem> GetInfographBySpec(string title = "", string newsItemId = "", DateTime? publishedOn = null,bool? isPublished = null, int pageIndex = 1, int pageSize = 20)
        {
            ObjectId id;
            ObjectId.TryParse(newsItemId, out id);
            return _newsItemService.GetInfographBySpec(title, id, publishedOn, isPublished,pageIndex, pageSize);
        }

        [Route("GetNewsToBeRelated")]
        public ResultWithCount<RelatedNewsItem> GetNewsToBeRelated(int pageIndex = 1, int pageSize = 20)
        {
            return _newsItemService.GetNewsToBeRelated(pageIndex, pageSize);
        }

        public OutPut Post(NewsItem newsItem)
        {
            _newsItemService.AddNewsItem(newsItem);
            return new OutPut { Id = newsItem.Id.ToString() };
        }

        public void Put(string id, NewsItem newsItem)
        {
            newsItem.Id = new ObjectId(id);
            _newsItemService.UpdateNewsItem(newsItem);
        }

        public void Delete(string id)
        {
            _newsItemService.RemoveNewsItem(new ObjectId(id));
        }

        #endregion
    }
}

