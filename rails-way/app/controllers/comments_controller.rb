class CommentsController < ApplicationController
  def index
  end

  def create
    @diff = Diff.find(params[:diff_id])
    @comment = @diff.comments.build(comment_params)

    respond_to do |format|
      if @comment.save
        format.html { redirect_to diff_path(@diff), notice: 'Comment was successfully created.' }
      else
        flash.now[:error] = "It doesnt work"
        redirect_to diff_path(@diff)
      end
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
    params.require(:comment).permit(:author, :body, :line, :side, :diff_id)
  end
end
