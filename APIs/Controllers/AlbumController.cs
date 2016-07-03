using System;
using System.Web.Http;
using Arabia.Core.Domain.Albums;
using Arabia.Core.Domain.Files;
using Arabia.Core.Domain.General;
using Arabia.Service.Backend.Albums;
using Arabia.Service.Backend.Files;
using MongoDB.Bson;

namespace Arabia.Web.API.Controllers
{   
    [RoutePrefix("Album")]
    public class AlbumController : ApiController
    {
        #region Fields

        private readonly IAlbumService _albumItemService;

        #endregion

        #region Ctor

        public AlbumController(IAlbumService albumItemService)
        {
            _albumItemService = albumItemService;
        }

        #endregion

        #region Methods

        public ResultWithCount<MiniDocument> Get(int pageIndex = 1, int pageSize = 20)
        {
            return _albumItemService.GetAlbums(pageIndex,pageSize);
        }

        public Album Get(string id)
        {
            return _albumItemService.GetAlbumById(new ObjectId(id));
        }

        [Route("GetBySpec")]
        public ResultWithCount<MiniAlbum> GetBySpec(string title = "", string newsItemId = "", DateTime? publishedOn = null, bool? isPublished = null, int pageIndex = 1, int pageSize = 20)
        {
            ObjectId id;
            ObjectId.TryParse(newsItemId, out id);
            return _albumItemService.GetAlbumsBySpec(title, id, publishedOn, isPublished,pageIndex, pageSize);
        }
        public OutPut Post(Album album)
        {
            _albumItemService.AddAlbum(album);
            return new OutPut { Id = album.Id.ToString() };
        }

        public void Put(string id, Album album)
        {
            album.Id = new ObjectId(id);
            _albumItemService.UpdateAlbum(album);
        }

        public void Delete(string id)
        {
            _albumItemService.RemoveAlbum(new ObjectId(id));
        }

        #endregion
    }
}
