module Diffy
  class API < Grape::API
    version 'v1', using: :header, vendor: 'twitter'
    format :json
    prefix :api

    get :hello do
      { hello: 'world' }
    end
  end
end
