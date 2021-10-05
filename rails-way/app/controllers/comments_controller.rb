class CommentsController < ApplicationController
  def index
  end

  def create
    @diff = Diff.find(params[:diff_id])
    @comment = @diff.comments.build(comment_params)

    if @comment.save
      redirect_to diff_path(@diff), notice: 'Comment was successfully created.'
    else
      redirect_to diff_path(@diff), alert: 'Something is wrong'
    end
  end

  def destroy
    @diff = Diff.find(params[:diff_id])
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to diff_path(@diff)
  end

  private
  def comment_params
    params.require(:comment).permit(:author_id, :body, :line, :side, :diff_id)
  end
end
