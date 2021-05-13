using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, 
                        new {Activity = "Could not find activity"});

                var user = await _dataContext.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName(),
                        cancellationToken);

                var attendance = await _dataContext.UserActivities
                    .SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id,
                        cancellationToken);

                if(attendance != null)
                    throw new RestException(HttpStatusCode.BadRequest,
                        new {Attendance = "Already attending this activity"});

                attendance = new UserActivity
                {
                    Activity = activity,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                await _dataContext.UserActivities.AddAsync(attendance, cancellationToken);

                var success = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}