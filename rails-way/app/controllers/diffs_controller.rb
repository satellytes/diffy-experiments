class DiffsController < ApplicationController
  def index
    @diffs = Diff.all
  end

  def show
    @diff = Diff.find(params[:id])
    @new_comment = Comment.new(diff: @diff)
  end

  def new
    @diff = Diff.new
  end

  def create
    @diff = Diff.create(diff_params)
    redirect_to @diff
  end

  private
  def diff_params
    params.require(:diff).permit(:title, :source)
  end

end
