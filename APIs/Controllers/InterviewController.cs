using System;
using System.Linq;
using System.Web.Http;
using Arabia.Core.Domain.General;
using Arabia.Core.Domain.Interviews;
using Arabia.Service.Backend.Interviews;
using MongoDB.Bson;

namespace Arabia.Web.API.Controllers
{
    [RoutePrefix("Interview")]
    public class InterviewController : ApiController
    {
        #region Fields

        private readonly IInterviewService _interviewService;
        
        #endregion

        #region Constructor

        public InterviewController(IInterviewService interviewService)
        {
            _interviewService = interviewService;
        }

        #endregion
        [Route("GetBySpec")]
        public ResultWithCount<MiniInterview> GetBySpec(string title = "", string newsItemId = "", DateTime? publishedOn = null, int pageIndex = 1, int pageSize = 20)
        {
            ObjectId id;
            ObjectId.TryParse(newsItemId, out id);
            return _interviewService.GetInterviewsBySpec(title, id, publishedOn, pageIndex, pageSize);
        }
      
        public ResultWithCount<MiniDocument> Get(int pageIndex = 1, int pageSize = 20)
        {
            return _interviewService.GetInterviews(pageIndex, pageSize);
        }

        public Interview Get(string id)
        {
            return _interviewService.GetInterviewById(new ObjectId(id));
        }
        public OutPut Post(Interview interview)
        {
            if (interview.Images!= null && interview.Images.Count > 0)
                interview.ImageId = interview.Images.First().ImageId;
            _interviewService.AddInterview(interview);
            return new OutPut { Id = interview.Id.ToString() };
        }

        public void Put(string id, Interview interview)
        {
            if (interview.Images != null && interview.Images.Count > 0)
                interview.ImageId = interview.Images.First().ImageId;
            interview.Id = new ObjectId(id);
            _interviewService.UpdateInterview(interview);
        }

        public void Delete(string id)
        {
            _interviewService.RemoveInterview(new ObjectId(id));
        }
    }
}