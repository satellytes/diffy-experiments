require "test_helper"

class DiffsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get diffs_index_url
    assert_response :success
  end
end
