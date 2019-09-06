class Api::UsersController < ApplicationController

  def create # sign up
    
    @user = User.new(user_params)
    #  
    if @user.save
      #  
      log_in!(@user)
      email = UserMailer.welcome_email(@user)
      debugger
      email.deliver_now
      email.deliver_later
      render :show
    else
      #  
      render json: @user.errors.full_messages, status: 422 #unprocessable entity
    end
  end

  # def show
  #    
  #   @user = User.find_by(params[:id]: id)
  # end

  private

  def user_params 
    params.require(:user).permit(:username, :email, :password, :confirm_password)
  end
end
