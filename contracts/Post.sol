//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

contract Post {

    struct PostDetail {
        string imageCID;
        string captionText;
        string author;
        string userName;
    }

    mapping(address => PostDetail[]) private userPosts;
    PostDetail[] private allPosts;

    function addPost(string memory _imageCID, string memory _captionText, string memory _author, string memory _userName) public {
        userPosts[msg.sender].push(PostDetail(_imageCID, _captionText, _author, _userName));
        allPosts.push(PostDetail(_imageCID, _captionText, _author, _userName));
    }

    function getPost() public view returns (PostDetail[] memory) {
        return userPosts[msg.sender];
    }

    function getAllPosts() public view returns (PostDetail[] memory) {
        return allPosts;
    }

    receive() external payable {

    }

    fallback() external {

    }

}