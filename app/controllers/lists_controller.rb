class ListsController < ApplicationController
  before_action :set_list, only: [:show, :update, :destroy]
  respond_to :json

  # GET /lists
  # GET /lists.json
  def index
    @lists = List.all
    respond_with(@lists) do |format|
      format.json { render :json => @lists.as_json }
      format.html
    end
  end

  def show
    respond_with(@list.as_json)
  end
  # POST /lists
  # POST /lists.json
  def create
    @list = List.create(list_params)
    if @list.save
      render json: @list.as_json, status: :ok
    else
      render json: {list: @list.errors, status: :no_content}
    end
  end

  def update
    if @list.update_attributes(list_params)
      render json: @list.as_json, status: :ok
    else
      render json: {list: @list.errors, status: :unprocessable_entity}
    end
  end
  # DELETE /lists/1
  # DELETE /lists/1.json
  def destroy
    @list.destroy
    render json: {status: :ok}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      @list = List.find(params[:id])
      render json: {status: :not_found} unless @list
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def list_params
      params.require(:list).permit(:name)
    end
end
