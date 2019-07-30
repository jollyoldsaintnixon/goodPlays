class Api::UsersController < ApplicationController

  def create # sign up
    @user = User.new(user_params)

    # debugger
    if @user.save
      # debugger
      log_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422 #unprocessable entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
