/**
 *  to be able to pass the promise here, then load the suspense
 * since loading.tsx does not render when searchParams got pushed
 * https://github.com/vercel/next.js/issues/49297
 */
export default async function Await({
  promise,
  children,
}: {
  promise: Promise<Response>;
  children: (value: any) => JSX.Element;
}) {
  let data = await promise;
  let jsonData = await data.json();

  return children(jsonData);
}
