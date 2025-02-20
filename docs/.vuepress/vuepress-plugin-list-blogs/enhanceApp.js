export default ({ Vue, router }) => {
  // 缓存原始的 $recoPosts 数据
  let originalRecoPosts = [];

  // 全局混入，覆盖 $recoPosts 的 computed 属性
  Vue.mixin({
    computed: {
      $recoPosts() {
        let posts = this.$site.pages;
        console.log("1", posts);
        posts = this.filterPosts(posts, false);
        console.log("2", posts);

        posts = this.filterPostsLocals(posts);
        console.log("3", posts);

        this.sortPostsByStickyAndDate(posts);
        console.log("4", posts);

        return posts;
      },
    },
    methods: {
      filterPosts(posts, isTimeline) {
        posts = posts.filter((item, index) => {
          const {
            title,
            frontmatter: { home, date, publish },
          } = item;
          // 过滤多个分类时产生的重复数据
          if (posts.indexOf(item) !== index) {
            return false;
          } else {
            const someConditions =
              home === true || title == undefined || publish === false;
            const boo =
              isTimeline === true
                ? !(someConditions || date === undefined)
                : !someConditions;
            return boo;
          }
        });
        return posts;
      },
      // 排序博客数据
      sortPostsByStickyAndDate(posts) {
        posts.sort((prev, next) => {
          const prevSticky = prev.frontmatter.sticky;
          const nextSticky = next.frontmatter.sticky;
          if (prevSticky && nextSticky) {
            return prevSticky == nextSticky
              ? compareDate(prev, next)
              : prevSticky - nextSticky;
          } else if (prevSticky && !nextSticky) {
            return -1;
          } else if (!prevSticky && nextSticky) {
            return 1;
          }
          return this.compareDate(prev, next);
        });
      },

      filterPostsLocals(posts) {
        console.log("local1", posts);
        posts = posts.filter((item, index) => {
          const { title, regularPath } = item;

          console.log(title + "  ===" + regularPath);

          if (this.$route.path.startsWith("/en")) {
            // 修正startWith为startsWith
            return regularPath.startsWith("/en");
          } else if (this.$route.path.startsWith("/jp")) {
            return regularPath.startsWith("/jp");
          } else {
            return (
              !regularPath.startsWith("/jp") && !regularPath.startsWith("/en")
            );
          }
        });

        console.log("local2", posts);

        return posts;
      },
      compareDate(a, b) {
        const aDateNum = this.getTimeNum(a.frontmatter.date);
        const bDateNum = this.getTimeNum(b.frontmatter.date);
        if (aDateNum === 0 || bDateNum === 0) return 0;
        return bDateNum - aDateNum;
      },
      getTimeNum(date) {
        const dateNum = !date ? 0 : new Date(date).getTime();
        return dateNum;
      },
    },
  });

  // 每次路由变化时，强制更新
  router.afterEach(() => {
    Vue.nextTick(() => {
      if (Vue.prototype.$forceUpdate) {
        Vue.prototype.$forceUpdate();
      }
    });
  });
};
