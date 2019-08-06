class Api::GameRacksController < ApplicationController
  def create
    # debugger
    @rack = current_user.game_racks.new(game_id: rack_params[:id])
    @user = current_user
    if @rack.save
      render 'api/users/show' # update the front end with current state of user's rack
    else 
      render json: ['Rack not able to add game'], status: 422
    end
  end

  def destroy
    # debugger
    @user = current_user
    game = Game.find(params[:id])

    if @user.games.delete(game) && game.users.delete(@user)

    # rack = GameRack.find_by(game_id: params[:id], user_id: @user.id)
    # if rack.destroy
      render 'api/users/show'
    else 
      render json: ['Not able to delete game from rack'], status: 422
    end
  end
  private

  def rack_params
    params.permit(:id)
  end

end

