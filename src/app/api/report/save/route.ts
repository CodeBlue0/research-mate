import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { topic, sections, status } = body;

        if (!topic || !sections) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if a report with this topic already exists
        const { data: existingReport } = await supabase
            .from('reports')
            .select('id')
            .eq('topic', topic)
            .maybeSingle();

        let result;

        if (existingReport) {
            // Update existing report
            result = await supabase
                .from('reports')
                .update({
                    sections,
                    status: status || 'draft',
                    created_at: new Date().toISOString() // Update timestamp to show latest activity
                })
                .eq('id', existingReport.id)
                .select();
        } else {
            // Insert new report
            result = await supabase
                .from('reports')
                .insert([
                    {
                        topic,
                        sections,
                        status: status || 'draft'
                    }
                ])
                .select();
        }

        const { data, error } = result;

        if (error) {
            console.error("Supabase Save Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error("Save API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
