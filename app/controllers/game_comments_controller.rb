class GameCommentsController < ApplicationController
    def index
        game = Game.find(params[:game_id])
        @comments = game.game_comments
        render :index
    end

    def show
        @comment = GameComment.find(params[:id])
        render :show
    end

    def create
        comment = current_user.game_comments.new(game_comment_params)
        if comment.save
            # game = comment.game
            # user = current_user

            render json: comment
        else
            render json: ['Attempt to add comment was unsuccesful'], status: 422
        end
    end

    def update
        
    end

    def destroy
        comment = GameComment.find(game_comment_params[:game][:game_comment_id])
        @game = Game.find(game_comment_params[:game][:game_id])
        if current_user.game_comments.delete(comment) && @game.game_comments.delete(comment)
            render `api/games/show`
        else  
            render json: ['Comment deletion unsuccessful'], status: 422
        end
    end

    private 

    def game_comment_params
        params.require(:comment).permit(:game_id, :title, :body, :parent_id)
    end
end
