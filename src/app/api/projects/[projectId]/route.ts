import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import FormData from "form-data";

type Props = {
  params: Promise<{ projectId: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { projectId } = await params;

    const { data } = await api(`/projects/${projectId}`);

    if (data) {
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error)?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken)
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  try {
    const { projectId } = await params;
    const { data } = await api.delete(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error)?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken)
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  try {
    const { projectId } = await params;
       const form = await request.formData();
   
       const nodeForm = new FormData();
       for (const [key, value] of form.entries()) {
         if (value instanceof File) {
           const buf = Buffer.from(await value.arrayBuffer());
           nodeForm.append(key, buf, {
             filename: value.name,
             contentType: value.type,
           });
         } else {
           nodeForm.append(key, String(value));
         }
       }
   
       const apiRes = await api.patch(`/projects/${projectId}`, nodeForm, {
         headers: {
           Authorization: `Bearer ${accessToken}`,
           ...nodeForm.getHeaders(),
         },
       });
   
       return NextResponse.json(apiRes.data, { status: apiRes.status });
     } catch (e) {
       return NextResponse.json(
         { error: (e as Error)?.message ?? "Server error" },
         { status: 500 }
       );
     }
}
