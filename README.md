## Infinite-scroll to get random cat images 🐱

### Basic idea

1. Fetch cat's images through an API call with a specified limit on the number of images.
2. Check the current position of the scroll.
3. When the scroll reaches the bottom, refetch images from the next page.
4. Repeat steps 1 to 3 until there are no more content left to fetch.
