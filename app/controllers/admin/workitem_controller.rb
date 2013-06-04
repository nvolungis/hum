class Admin::WorkitemController < Admin::AdminBaseController
  def index
    @workitem = Workitem.first
  end  
    
    
  def edit
    @workitem = Workitem.find(params[:id])
  end


	def update
		@workitem = Workitem.find(params[:id])
		if @workitem.update_attributes(params[:workitem])
      flash['alert-success'] = 'workitem has been updated.'
      redirect_to admin_root_path
    else
      flash['alert-error'] = 'workitem has not been updated.'
      render :action => "edit"
    end
	end
end
