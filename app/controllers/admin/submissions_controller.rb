class Admin::SubmissionsController < AdminBaseController

  def index
    @submissions = Submission.all
  end
  
end
