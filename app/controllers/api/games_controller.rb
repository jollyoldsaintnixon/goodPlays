class Api::GamesController < ApplicationController
  # caches_action :index

  def index
    expires_in 24.hours, :public => true
    # @games = Game.with_attached_image.page(params[:page]).per(25)
    @games = Game.with_attached_image.includes(:game_comments)
    render :index
  end

  def show
    @game = Game.includes(:game_comments).find(params[:id])
  end

  def update
    
    @game = Game.find(params[:comment][:game_id])
    game_rating = @game.rating ? @game.rating : 0
    game_rating_count = @game.rating_count
    comment_rating = params[:comment][:rating] ? params[:comment][:rating].to_i : nil# make sure it's an integer vs a string
    
    game_rating = comment_rating > 0 ? ((game_rating * game_rating_count) + comment_rating) / (game_rating_count + 1) # the math to get the new average rating
      : game_rating; # change game rating only if comment included rating
    game_rating_count = comment_rating > 0 ? game_rating_count + 1 : game_rating_count; # increment count if comment ratng
    
    if @game.update(rating: game_rating, rating_count: game_rating_count)
      # @games = Game.with_attached_image.includes(:game_comments)
      # render :index
      render :show
    else
      render json: ['Could not rate game'], status: 422
    end
  end

  def count
    
    count = Game.count
    #  
    render json: {count: count}
  end


end
