class SubmissionController < ApplicationController
  def new 
  end
  
  def create
    @submission = Submission.new(params[:submission])
    if @submission.save
      flash['alert-success'] = "Thanks for the submission. We'll get back to you soon!" 
      redirect_to root_path
    else
      err = '<ul>'
      @submission.errors.full_messages.each do |message|
        err += "<li>#{message}</li>"
      end
      err += '</ul>'
      
      flash['alert-error'] = err
      
      redirect_to root_path
    end
  end
end
