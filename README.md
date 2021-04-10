# Docker practice with MERN

Re-using most of an old homework from GA to remind myself of the MERN stack and practice a mini docker setup. Plus, playing with [Material UI](https://material-ui.com/).

## To run locally

1. Clone the repo, install docker and docker-compose.

2. Build images and start the containers
    ```bash
    $ docker-compose build && docker-compose up -d
    ```

3. To seed the database, attach to the backend container with the following
    ```bash
    $ docker exec -it mern-colours_backend_1 bash
    ```

    Inside the container, run
    ```bash
    $ yarn run seed
    ```
    
    Or alternatively, you can run the command in the background with
    ```bash
    $ docker exec -d mern-colours_backend_1 yarn run seed
    ```

4. Navigate to `localhost:8001`on your browser.