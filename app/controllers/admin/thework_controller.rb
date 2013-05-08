class Admin::TheworkController < AdminBaseController
  def index
    @thework = Thework.first
  end  
    
    
  def edit
    @thework = Thework.find(params[:id])
  end


	def update
		@thework = Thework.find(params[:id])
		if @thework.update_attributes(params[:thework])
      flash['alert-success'] = 'thework has been updated.'
      redirect_to admin_root_path
    else
      flash['alert-error'] = 'thework has not been updated.'
      render :action => "edit"
    end
	end

end
