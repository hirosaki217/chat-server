const friendService = require('../services/FriendService');

// /friends
class FriendController {
    constructor() {
        this.acceptFriend = this.acceptFriend.bind(this);
        this.sendFriendInvite = this.sendFriendInvite.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
        this.deleteFriendInvite = this.deleteFriendInvite.bind(this);
        this.deleteInviteWasSend = this.deleteInviteWasSend.bind(this);
    }

    // /?name
    async getListFriends(req, res, next) {
        const { _id } = req;
        const { name = '' } = req.query;

        try {
            const friends = await friendService.getList(name, _id);

            res.json(friends);
        } catch (err) {
            next(err);
        }
    }

    //  /:userId
    async acceptFriend(req, res, next) {
        const { _id } = req;
        const { userId } = req.params;

        try {
            const result = await friendService.acceptFriend(_id, userId);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    //  /:userId
    async deleteFriend(req, res, next) {
        const { _id } = req;
        const { userId } = req.params;
        try {
            await friendService.deleteFriend(_id, userId);

            res.status(204).json();
        } catch (err) {
            next(err);
        }
    }

    //  /invites
    async getListFriendInvites(req, res, next) {
        const { _id } = req;
        try {
            const friendInvites = await friendService.getListInvites(_id);

            res.json(friendInvites);
        } catch (err) {
            next(err);
        }
    }

    //  /invites/:userId
    async deleteFriendInvite(req, res, next) {
        const { _id } = req;
        const { userId } = req.params;

        try {
            await friendService.deleteFriendInvite(_id, userId);

            res.status(204).json();
        } catch (err) {
            next(err);
        }
    }

    //  /invites/me
    async getListFriendInvitesWasSend(req, res, next) {
        const { _id } = req;
        try {
            const friendInvites = await friendService.getListInvitesWasSend(_id);

            res.json(friendInvites);
        } catch (err) {
            next(err);
        }
    }

    //  /invites/me/:userId
    async sendFriendInvite(req, res, next) {
        const { _id } = req;
        const { userId } = req.params;
        try {
            await friendService.sendFriendInvite(_id, userId);

            res.status(201).json();
        } catch (err) {
            next(err);
        }
    }

    // /invites/me/:userId
    async deleteInviteWasSend(req, res, next) {
        const { _id } = req;
        const { userId } = req.params;

        try {
            await friendService.deleteInviteWasSend(_id, userId);

            res.status(204).json();
        } catch (err) {
            next(err);
        }
    }

    //  /suggest
    async getSuggestFriends(req, res, next) {
        const { _id } = req;
        const { page = 0, size = 12 } = req.query;

        try {
            const suggestFriends = await friendService.getSuggestFriends(_id, parseInt(page), parseInt(size));

            res.json(suggestFriends);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = FriendController;
