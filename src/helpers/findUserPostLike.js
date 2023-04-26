export const findUserPostLike = (likes, userId, documentId) => {
  const isLike = likes
    .flat()
    .find((el) => el.userId === userId && el.documentId === documentId);

  return isLike ? isLike.like : false;
};

export const countPostLikes = (likes, documentId) => {
  const countLikes = likes
    .flat()
    .filter((el) => el.like === true && el.documentId === documentId);

  return countLikes.length;
};
