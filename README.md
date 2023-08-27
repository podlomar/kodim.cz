# kodim.cz

Web for publishing materials from programming courses

## Running locally

1. Clone this branch to your computer
2. On your harddrive create folder for the content. Let's call it `<content-root>`
3. The top level content entriess are called `topics`. To create a topic, create for example folder `<content-root>/vyvoj-webu`.
4. Create general entry file `<content-root>/entry.yml` with:
   ```yml
   topics:
     vyvoj-webu
   ```
5. In your topic folder create an entry file `entry.yml` with:
   ```yml
   title: Vývoj webu
   lead: Něco něco
   courses:
     daweb-vyuka
   ```
6. Clone the repo `daweb-vyuka` to your topic folder.
7. Run the web from inside the `website` directory with `npm run start`.
