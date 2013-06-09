class Admin::SubmissionsController < Admin::AdminBaseController

  def index
    @submissions = Submission.all
  end
  
end
