// app/api/test-env/route.js
export async function GET() {
  return Response.json({
    emailUser: process.env.EMAIL_USER ? process.env.EMAIL_USER : "missing",
    emailPass: process.env.EMAIL_PASSWORD
      ? process.env.EMAIL_PASSWORD
      : "missing",
  });
}
