export default {
  data() {
    return {
      // 定义一个可变的 recoPosts，用于存放筛选后的内容
      filteredRecoPosts: [],
    };
  },
  computed: {
    // $recoPosts() {
    //   this.refreshKey;
    //   let posts = this.$site.pages;
    //   console.log("xxxxxxxxxxx", posts);
    //   posts = this.filterPosts(posts, false);
    //   posts = this.filterPostsLocals(posts);
    //   this.sortPostsByStickyAndDate(posts);
    //   console.log("最新的文章：", posts);
    //   return posts;
    // },

    // 获取全部 $recoPosts
    allPosts() {
      return this.$recoPosts || [];
    },
    // 根据路径进行筛选
    filteredPosts() {
      return this.filterPostsLocals(this.allPosts);
    },
  },
  watch: {
    // 监听路由变化，并重新赋值给 $recoPosts
    "$route.path"() {
      this.updateRecoPosts();
    },
  },
  mounted() {
    this.updateRecoPosts();
    console.log("qqqqqqq", this.$recoPosts); // 使用$recoPosts而非recoPosts
    console.log("当前路由路径：", this.$route.path);
  },
  methods: {
    refreshPosts() {
      // 通过修改 refreshKey 来触发 $recoPosts 重新计算
      this.refreshKey++;
    },
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
        return compareDate(prev, next);
      });
    },

    filterPostsLocals(posts) {
      console.log("all", posts);
      posts = posts.filter((item, index) => {
        const { title, regularPath } = item;
        if (this.$route.path.startsWith("/en")) {
          // 修正startWith为startsWith
          return regularPath.startsWith("en");
        } else if (this.$route.path.startsWith("/jp")) {
          return regularPath.startsWith("jp");
        } else {
          return !regularPath.startsWith("jp") && !regularPath.startsWith("en");
        }
      });

      console.log("all2", posts);

      return posts;
    },

    updateRecoPosts() {
      this.$recoPosts = this.filteredPosts;
    },
  },
};
