class ItemsController < ApplicationController
  respond_to :json, :html
  def index
    @list = List.find(params[:list_id])
    @items = @list.items
    respond_with(@items) do |format|
      format.json { render :json => @items.as_json }
    end
  end

  # POST /items
  # POST /items.json
  def create
    item = list.items.create!(item_params)
    render json: item, status: 201
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    task
      if @item.update(item_params)
            render json: @list.as_json, status: :ok
    else
      render json: {list: @item.errors, status: :unprocessable_entity}
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    task
    if @item.destroy
      flash[:success] = "Item was deleted."
    else
      flash[:error] = "Item not deleted."
    end
   render json: {status: :ok}
  end

  private
  def list
    @list ||= List.find(params[:list_id])
  end

  def task
    @item ||= list.items.find(params[:id])
  end
  def item_params
    params[:item].permit(:name)
  end
end
