(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{540:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"classloader"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#classloader"}},[s._v("#")]),s._v(" Classloader")]),s._v(" "),t("h3",{attrs:{id:"分类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#分类"}},[s._v("#")]),s._v(" 分类")]),s._v(" "),t("ul",[t("li",[s._v("引导类加载器:负责加载支撑JVM运行的位于JRE的lib目录下的核心类库，比如 rt.jar、charsets.jar等")]),s._v(" "),t("li",[s._v("扩展类加载器:负责加载支撑JVM运行的位于JRE的lib目录下的ext扩展目录中的JAR类包")]),s._v(" "),t("li",[s._v("应用程序类加载器:负责加载ClassPath路径下的类包，主要就是加载你自己写的那些类")]),s._v(" "),t("li",[s._v("自定义加载器:负责加载用户自定义路径下的类包")])]),s._v(" "),t("h3",{attrs:{id:"双亲委派机制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#双亲委派机制"}},[s._v("#")]),s._v(" 双亲委派机制")]),s._v(" "),t("p",[s._v("简单的说就是：加载某个类时会先委托父加载器寻找目标类，找不到再委托上层父加载器加载，如果所有父加载器在自己的加载类路径下都找不到目标类，则在自己的类加载路径中查找并载入目标类。\n这样设计的好处")]),s._v(" "),t("ul",[t("li",[s._v("沙箱安全：保证Java的核心API不被篡改")]),s._v(" "),t("li",[s._v("避免类的重复加载，保证了被加载类的唯一性。")])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[s._v("    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("protected")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Class")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("loadClass")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("boolean")]),s._v(" resolve"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("throws")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ClassNotFoundException")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("synchronized")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getClassLoadingLock")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// First, check if the class has already been loaded")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Class")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" c "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("findLoadedClass")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//主要体现双亲委派的部分")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("long")]),s._v(" t0 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("nanoTime")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("parent "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                        c "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" parent"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("loadClass")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                        c "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("findBootstrapClassOrNull")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("catch")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ClassNotFoundException")]),s._v(" e"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ClassNotFoundException thrown if class not found")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// from the non-null parent class loader")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n                "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// If still not found, then invoke findClass in order")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// to find the class.")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("long")]),s._v(" t1 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("nanoTime")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                    c "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("findClass")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n                    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// this is the defining class loader; record the stats")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("PerfCounter")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getParentDelegationTime")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("addTime")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("t1 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" t0"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("PerfCounter")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getFindClassTime")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("addElapsedTimeFrom")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("t1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("PerfCounter")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getFindClasses")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("increment")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("resolve"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolveClass")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br"),t("span",{staticClass:"line-number"},[s._v("35")]),t("br"),t("span",{staticClass:"line-number"},[s._v("36")]),t("br"),t("span",{staticClass:"line-number"},[s._v("37")]),t("br"),t("span",{staticClass:"line-number"},[s._v("38")]),t("br")])]),t("p",[s._v("所以说在同一个JVM内，两个相同包名和类名的类对象可以共存，因为他们的类加载器可以不一样，所以看两个类对象是否是同一个，除了看类的包名和类名是否都相同之外，还需要他们的类 加载器也是同一个才能认为他们是同一个。")]),s._v(" "),t("h2",{attrs:{id:"jvm内存模型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jvm内存模型"}},[s._v("#")]),s._v(" JVM内存模型")]),s._v(" "),t("h3",{attrs:{id:"内存模型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#内存模型"}},[s._v("#")]),s._v(" 内存模型")]),s._v(" "),t("p",[t("img",{attrs:{src:"/blog/java/jvm/jvm.jpeg",alt:"0001"}})]),s._v(" "),t("h3",{attrs:{id:"概念相关"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#概念相关"}},[s._v("#")]),s._v(" 概念相关")]),s._v(" "),t("p",[s._v("感谢一篇知乎的文章\n"),t("a",{attrs:{href:"JVM%E5%86%85%E5%AD%98%E7%BB%93%E6%9E%84%E5%92%8CJava%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B"}},[s._v("https://zhuanlan.zhihu.com/p/38348646")])]),s._v(" "),t("h3",{attrs:{id:"对象创建过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对象创建过程"}},[s._v("#")]),s._v(" 对象创建过程")]),s._v(" "),t("ol",[t("li",[s._v("类加载检查：new指令能否在常量池中定位到一个类的引用符号，判断其是否已经被加载。")]),s._v(" "),t("li",[s._v("分配内存：在类加载检查通过后，接下来虚拟机将为新生对象分配内存。对象所需内存的大小在类加载完成后便可完全确定，为对象分配空间的任务等同于把一块确定大小的内存从Java堆中划分出来。\n"),t("ul",[t("li",[s._v("“指针碰撞”（Bump thePointer）：\n假设Java堆中内存是绝对规整的，所有用过的内存都放在一边，空闲的内存放在另一边，中间放着一个指针作为分界点的指示器，那所分配内存就仅仅是把那个指针向空闲空间那边挪动一段与对象大小相等的距离")]),s._v(" "),t("li",[s._v("空闲列表”（FreeList）：\n如果Java堆中的内存并不是规整的，已使用的内存和空闲的内存相互交错，那就没有办法简单地进行指针碰撞了，虚拟机就必须维护一个列表，记录上哪些内存块是可用的，在分配的时候从列表中找到一块足够大的空间划分给对象实例，并更新列表上的记录。\n选择哪种分配方式由Java堆是否规整决定，而Java堆是否规整又由所采用的垃圾收集器是否带有压缩整理功能决定。因此，在使用Serial、ParNew等带Compact过程的收集器时，系统采用的分配算法是指针碰撞，而使用CMS这种基于Mark-Sweep算法的收集器时，通常采用空闲列表。")])])]),s._v(" "),t("li",[s._v("初始化：虚拟机需要将分配到的内存空间都初始化为零值。")]),s._v(" "),t("li",[s._v("设置对象头：\n"),t("ul",[t("li",[s._v("第一部分用于存储对象自身的运行时数据， 如HashCode、GC分代年龄、锁状态标志、线程持有的锁、偏向线程ID、偏向时间戳等。")]),s._v(" "),t("li",[s._v("对象头的另外一部分 是类型指针，即对象指向它的类元数据的指针，虚拟机通过这个指针来确定这个对象是哪个类的实例。")])])]),s._v(" "),t("li",[s._v("执行init方法：程序意义上的初始化。执行构造方法。")])]),s._v(" "),t("h3",{attrs:{id:"对象内存分配"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对象内存分配"}},[s._v("#")]),s._v(" 对象内存分配")]),s._v(" "),t("blockquote",[t("p",[s._v("图片链接来自"),t("a",{attrs:{href:"Java%E5%AF%B9%E8%B1%A1%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D%E6%B5%81%E7%A8%8B"}},[s._v("https://www.processon.com/view/603a066de401fd20fbc16e70?fromnew=1")])])]),s._v(" "),t("p",[t("img",{attrs:{src:"/blog/java/jvm/jvm0002.png",alt:"0001"}})]),s._v(" "),t("h4",{attrs:{id:"对象栈上分配"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对象栈上分配"}},[s._v("#")]),s._v(" 对象栈上分配")]),s._v(" "),t("p",[s._v("JVM通过逃逸分析确定该对象不会被外部访问。如果不会逃逸可以将该对象在栈上分配内存，这样该对象所占用的内存空间就可以随栈帧出栈而销毁，就减轻了垃圾回收的压力。")]),s._v(" "),t("ul",[t("li",[s._v("对象逃逸分析:就是分析对象动态作用域，当一个对象在方法中被定义后，它可能被外部方法所引用，例如作为调用参数传递到其他地方中。比如一个void方法得到的对象，没有其他调用，就可以直接分配到栈内存里。JDK1.7以后默认开启")]),s._v(" "),t("li",[s._v("标量替换：标量可以理解成一种不可分解的变量，如java内部的基本数据类型、引用类型等。 与之对应的聚合量是可以被拆解的，如对象。当通过逃逸分析一个对象只会作用于方法内部，虚拟机可以通过使用标量替换来进行优化。")])]),s._v(" "),t("h4",{attrs:{id:"堆内存分区"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#堆内存分区"}},[s._v("#")]),s._v(" 堆内存分区")]),s._v(" "),t("p",[t("img",{attrs:{src:"/blog/java/jvm/jvm0003.png",alt:"0003"}}),s._v("\n大量的对象被分配在eden区，eden区满了后会触发minor gc，可能会有99%以上的对象成为垃圾被回收掉，剩余存活的对象会被挪到为空的那块survivor区。\n下一次eden区满了后又会触发minor gc，把eden区和survivor区垃圾对象回收，把剩余存活的对象一次性挪动到另外一块为空的survivor区。\n所以JVM默认的Eden与Survivor区默认8:1:1。应该让让eden区尽量的大，survivor区够用即可\nJVM默认有这个参数-XX:+UseAdaptiveSizePolicy(默认开启)，会导致这个8:1:1比例自动变化。")]),s._v(" "),t("h4",{attrs:{id:"对象进入老年代各种情况"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对象进入老年代各种情况"}},[s._v("#")]),s._v(" 对象进入老年代各种情况")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("正常情况；虚拟机给每个对象一个对象年龄(Age)计数器。如果对象在 eden 出生并经过第一次 Minor GC 后仍然能够存活，并且能被 Survivor 容纳的话，将被移动到 Survivor空间中，并将对象年龄设为1。 对象在 Survivor 中每熬过一次 MinorGC，年龄就增加1岁，当它的年龄增加到一定程度 (默认为15岁，CMS收集器默认6岁，不同的垃圾收集器会略微有点不同)，就会被晋升到老年代中。对象晋升到老年代 的年龄阈值，可以通过参数-XX:+MaxTenuringThreshold来设置。")])]),s._v(" "),t("li",[t("p",[s._v("eden的空间不够了，虚拟机将发起一次Minor GC，GC期间虚拟机又发现分配的对象无法存入Survior空间，所以只好把新生代的对象提前转移到老年代中去")])]),s._v(" "),t("li",[t("p",[s._v("大对象，通过-XX:PretenureSizeThreshold=字节数 来配置对象，如果返现大于该字节数的对象就直接放入老年代。")])]),s._v(" "),t("li",[t("p",[s._v("对象动态年龄判断：在survivor区中，年龄从低到高开始排序计算，内存总大小的50%，可以通过-XX:TargetSurvivorRatio指定。那么这是大于等于这些对象中年龄最大值的对象，就可以直接进入老年代。其实就是，每次minor gc已经不能完整清空50%的survivor空间了，为了使长期存过的对象尽早进入老年代。")])]),s._v(" "),t("li",[t("p",[s._v('空间分配担保：年轻代每次minor gc之前JVM都会计算下老年代剩余可用空间 如果这个可用空间小于年轻代里现有的所有对象大小之和(包括垃圾对象)，就会看一个“-XX:-HandlePromotionFailure”(jdk1.8默认就设置了)的参数是否设置了。如果有这个参数，就会看看老年代的可用内存大小，是否大于之前每一次minor gc后进入老年代的对象的平均大小。 如果上一步结果是小于或者之前说的参数没有设置，那么就会触发一次Full gc，对老年代和年轻代一起回收一次垃圾， 如果回收完还是没有足够空间存放新的对象就会发生"OOM"当然，如果minor gc之后剩余存活的需要挪动到老年代的对象大小还是大于老年代可用空间，那么也会触发full gc，full gc完之后如果还是没有空间放minor gc之后的存活对象，则也会发生“OOM”\n'),t("img",{attrs:{src:"/blog/java/jvm/jvm0004.png",alt:"0004"}})])])]),s._v(" "),t("h3",{attrs:{id:"内存回收"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#内存回收"}},[s._v("#")]),s._v(" 内存回收")]),s._v(" "),t("h4",{attrs:{id:"引用计数法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#引用计数法"}},[s._v("#")]),s._v(" 引用计数法")]),s._v(" "),t("p",[s._v("给对象中添加一个引用计数器，每当有一个地方引用它，计数器就加1;当引用失效，计数器就减1;任何时候计数器为0的对象就是不可能再被使用的。 这个方法实现简单，效率高，但是目前主流的虚拟机中并没有选择这个算法来管理内存，其最主要的原因是它很难解决 对象之间相互循环引用的问题。")]),s._v(" "),t("h4",{attrs:{id:"可达性分析算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#可达性分析算法"}},[s._v("#")]),s._v(" 可达性分析算法")]),s._v(" "),t("p",[s._v("将“GC Roots” 对象作为起点，从这些节点开始向下搜索引用的对象，找到的对象都标记为非垃圾对象，其余未标记的 对象都是垃圾对象\nGC Roots根节点:线程栈的本地变量、静态变量、本地方法栈的变量等等")]),s._v(" "),t("ul",[t("li",[s._v("软引用的应用\n将对象用SoftReference软引用类型的对象包裹，正常情况不会被回收，但是GC做完后发现释放不出空间存放 新的对象，则会把这些软引用的对象回收掉。软引用可用来实现内存敏感的高速缓存。\nMybatis缓存里的实例")])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Object")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getObject")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Object")]),s._v(" key"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Object")]),s._v(" result "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SoftReference")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Object")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" softReference "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SoftReference")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("delegate"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getObject")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("key"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("softReference "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        result "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" softReference"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("get")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("delegate"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("removeObject")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("key"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("synchronized")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("hardLinksToAvoidGarbageCollection"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("hardLinksToAvoidGarbageCollection"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("addFirst")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("hardLinksToAvoidGarbageCollection"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("size")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("numberOfHardLinks"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("hardLinksToAvoidGarbageCollection"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("removeLast")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" result"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br")])]),t("ul",[t("li",[s._v("finalize自救\n可达性分析后发现没有与GC Roots相连接的引用链的情况下，第一次标记这个对象，如果对象没有复写finalize的话，直接回收，如果复写了，我们可以在finalize方法中进行自救，也就是说让他重新与引用链创建关联。而这个finalize只能执行一次。不能多次自救。")])]),s._v(" "),t("h3",{attrs:{id:"常量池"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常量池"}},[s._v("#")]),s._v(" 常量池")]),s._v(" "),t("p",[s._v("Class常量池可以理解为是Class文件中的资源仓库。 Class文件中除了包含类的版本、字段、方法、接口等描述信息外， 还有一项信息就是常量池(constant pool table)，用于存放编译期生成的各种字面量(Literal)和符号引用(Symbolic References)。可以通过javap -v 生成可读的JVM字节码指令文件。")]),s._v(" "),t("ul",[t("li",[s._v("字面量\n由字母、数字等构成的字符串或者数值常量")]),s._v(" "),t("li",[s._v("符号引用\n"),t("ul",[t("li",[s._v("类和接口的全限定名")]),s._v(" "),t("li",[s._v("字段的名称和描述符")]),s._v(" "),t("li",[s._v("方法的名称和描述符\n这些常量池现在是静态信息，只有到运行时被加载到内存后，这些符号才有对应的内存地址信息，这些常量池一旦被装入内存就变成运行时常量池，对应的符号引用在程序加载或运行时会被转变为被加载到内存区域的代码的直接引用，也就是我们说的动态链接了。")])])]),s._v(" "),t("li",[s._v("字符串常量池\n"),t("ul",[t("li",[s._v('String s= "abc"; 直接创建在常量池中，返回常量池中的引用')]),s._v(" "),t("li",[s._v('String s= new String("abc"); 在常量池和堆中都有这个对象，最后返回堆中这个对象。')])])])]),s._v(" "),t("h2",{attrs:{id:"工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#工具"}},[s._v("#")]),s._v(" 工具")]),s._v(" "),t("ul",[t("li",[s._v("Jmap\n可以查看一些内存信息，比如堆信息，输出堆的dump文件等等。")]),s._v(" "),t("li",[s._v("Jstack\n可以通过PID监测死锁，或者将PID调整为16进制，通过grep -A来检查CPU情况。")]),s._v(" "),t("li",[s._v("Jinfo\n查看正在运行的Java应用程序的扩展参数")]),s._v(" "),t("li",[s._v("Jstat\njstat命令可以查看堆内存各部分的使用量，以及加载类的数量。\n可以通过最常用jstat -gc pid 1000 10 (每隔1秒执行1次命令，共执行10次) ，可以评估程序内存使用及GC压力整体情况,优化思路其实简单来说就是尽量让每次Young GC后的存活对象小于Survivor区域的50%，都留存在年轻代里。尽量别让对象进入老年代。尽量减少Full GC的频率，避免频繁Full GC对JVM性能的影响。")]),s._v(" "),t("li",[s._v("Arthas\nArthas 是Alibaba开源的Java诊断工具.\n[https://arthas.aliyun.com/doc/arthas-tutorials.html?language=cn&id=arthas-basics](Arthas 用户文档)")]),s._v(" "),t("li",[s._v("GCeasy\n负责分析GC Log的网站\n"),t("a",{attrs:{href:"GCeasy"}},[s._v("https://gceasy.io/")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);