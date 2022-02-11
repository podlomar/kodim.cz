//   {
//     path: "/kurzy/:courseLink/:chapterLink/:lessonLink/:sectionLink",
//     fetch: async (cms: KodimCms, params: Params): Promise<PageData> => {
//       const lesson = await cms.getRoot()
//         .find(params.courseLink as string)
//         .find(params.chapterLink as string)
//         .find(params.lessonLink as string)
//         .fetch({
//           link: params.sectionLink as string
//         });

//       return { 
//         status: makeStatusFromResource(lesson),
//         data: { 
//           lesson,
//         }
//       };
//     },
//   },
// ];