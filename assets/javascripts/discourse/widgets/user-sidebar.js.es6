import { createWidget } from 'discourse/widgets/widget';
import { getLatestReplies } from '../lib/recent-replies';
import { getOwner } from 'discourse-common/lib/get-owner';
import { h } from 'virtual-dom';

export default createWidget('user-sidebar', {
    tagName: 'div.user-sidebar.widget-container',
    buildKey: () => 'user-sidebar',

    defaultState() {
      return {
        posts: [],
        loading: true
      };
    },

    refreshPosts() {
      getLatestReplies().then((result) => {
        if (result.length) {
          for (var i = result.length - 1; i >= 0; i--) {
            // remove first post in a topic (not a reply)
            // remove any "post" that is merely an action
            // remove hidden posts
            if (result[i].post_number < 2 || result[i].action_code != undefined || result[i].hidden) {
              result.splice(i, 1);
            }
          }

          for (var i = result.length - 1; i >= 0; i--) {
            // limit to 5 max
            if (i > 4) {
              result.splice(i, 1);
            }
          }

          this.state.posts = result;
        }

        this.state.loading = false;
        this.scheduleRerender();
      });
    },

    html(attrs, state) {
      const posts = state.posts;
      const messageBus = getOwner(this).lookup('message-bus:main');

      messageBus.subscribe("/latest", () => {
        this.refreshPosts();
      });

      if (state.loading) {
        this.refreshPosts();
      }

      let result = [];
      if (state.loading) {
        result.push(h('div.spinner-container', h('div.spinner')));
      } else if (posts.length) {
        result.push(h('h3.sidebar-heading', I18n.t('sidebar.recent_replies')));
        const replies = state.posts.map(t => this.attach('sidebar-reply-item', t));
        result.push(replies);
      } else {
        result.push(h('div.no-messages', 'No recent replies.'));
      }

      return h('div.widget-inner', result);
    },
});
